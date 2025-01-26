import { toaster } from '@/components/ui/toaster';
import { capitalize } from '@/lib/helpers/utils';
import { submitAddUserToClass } from '@/lib/packages/classes/actions/students.action';
import { submitAddTeacherToClass } from '@/lib/packages/classes/actions/teacher.action';
import { API_ROUTES } from '@/lib/routes/server.route';
import { useRef, useState } from 'react';

let controller = new AbortController();

/**
 * @param {() => void} onClose
 * @param {Classe} klass
 * @param {FrontUserRole} role
 */
export function useAddUserToClass(onClose, klass, role) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const handleSearch = async (search) => {
    if (controller) {
      controller.abort();
    }
    if (!search) {
      setOpen(false);
      setUsers([]);
      return;
    }
    controller = new AbortController();
    try {
      const searchUrl =
        role === 'student'
          ? API_ROUTES.STUDENTS(search)
          : API_ROUTES.USERS(search);

      const response = await fetch(searchUrl, { signal: controller.signal });
      if (!response.ok) {
        setUsers([]);
        setOpen(false);
        return;
      }
      /**
       * @type {{data: FrontUser[]}}
       */
      const data = await response.json();
      if (data.data.length === 0) {
        setUsers([]);
        setOpen(false);
        return;
      }
      setUsers(data.data.sort((a, b) => a.classes.length - b.classes.length));
      setOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  const onAddUserToClass = async () => {
    setSubmitting(true);
    const action =
      role === 'student' ? submitAddUserToClass : submitAddTeacherToClass;
    const response = await action({
      classId: klass.id,
      ...(role === 'student'
        ? { studentId: selectedUser.id }
        : { teacherId: selectedUser.id }),
      classSlug: klass.slug,
    });
    setSubmitting(false);
    if (response.success) {
      toaster.success({
        title: `${capitalize(role)} added to class successfully`,
      });
      onClose?.();
    } else if (response.error) {
      toaster.error({
        title: `Failed to add ${role} to class`,
        description: response.error,
        type: 'error',
      });
    }
  };

  return {
    users,
    selectedUser,
    setSelectedUser,
    submitting,
    setSubmitting,
    open,
    setOpen,
    ref,
    handleSearch,
    onAddUserToClass,
  };
}

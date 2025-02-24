'use client';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';

/**
 * @param {Object} props
 * @param {import('@chakra-ui/react').ListCollection<FrontTeacher>} props.collection
 * @param {()=>void} props.onValueChange
 * @param {string} props.value
 * @param {React.MutableRefObject} [portalRef]
 */
export function SelectTeacherForCourseCreate({
  collection,
  onValueChange,
  value,
  portalRef,
}) {
  return (
    <SelectRoot
      collection={collection}
      value={value}
      onValueChange={onValueChange}
      size='sm'
      minWidth='11rem'
      width='100%'
      colorScheme='blue'
    >
      <SelectTrigger>
        <SelectValueText placeholder='Select teacher that will teach this course' />
      </SelectTrigger>
      <SelectContent portalRef={portalRef}>
        {collection.items.map((klass) => (
          <SelectItem item={klass} key={klass.classTeacherId}>
            {klass.firstName} {klass.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

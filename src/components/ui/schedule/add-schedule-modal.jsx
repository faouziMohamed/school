import {
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddScheduleForm } from '@/components/ui/schedule/add-schedule-form';
import { Button, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { LuPlus } from 'react-icons/lu';

/**
 * @param {Object} props
 * @param {FrontUserClass} props.klass
 */
export function AddScheduleModal({ klass }) {
  const contentRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  return (
    <DialogRoot
      closeOnInteractOutside={false}
      scrollBehavior='inside'
      lazyMount
      open={openDialog}
      onOpenChange={(e) => {
        setOpenDialog(e.open);
        setIsClosing(true);
      }}
      placement='center'
    >
      <DialogBackdrop />
      <DialogTrigger asChild>
        <Button colorScheme='blue' size='sm'>
          <LuPlus />
          <Text hideBelow='ssm'>Add Schedule</Text>
        </Button>
      </DialogTrigger>
      <DialogContent m='0.5rem' ref={contentRef}>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>
            <Text>
              Add Schedule for the{' '}
              <Text as='span' fontWeight='bold'>
                {klass.name}
              </Text>{' '}
              class
            </Text>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <AddScheduleForm
            portalRef={contentRef}
            klass={klass}
            isClosing={isClosing}
          />
          <DialogCloseTrigger />
        </DialogBody>

        <DialogFooter justifyContent='flex-start'>
          <DialogActionTrigger asChild>
            <Button>Cancel</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

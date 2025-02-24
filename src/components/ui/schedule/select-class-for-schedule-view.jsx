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
 * @param {import('@chakra-ui/react').ListCollection<FrontUserClass>} props.collection
 * @param {()=>void} props.onValueChange
 * @param {string} props.value
 */
export function SelectClassForScheduleView({
  collection,
  onValueChange,
  value,
}) {
  return (
    <SelectRoot
      collection={collection}
      value={value}
      onValueChange={onValueChange}
      size='sm'
      minWidth='11rem'
      maxWidth='20rem'
      width='auto'
      colorScheme='blue'
    >
      <SelectTrigger>
        <SelectValueText placeholder='Select a class to view schedule' />
      </SelectTrigger>
      <SelectContent>
        {collection.items.map((klass) => (
          <SelectItem item={klass} key={klass.name}>
            {klass.name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

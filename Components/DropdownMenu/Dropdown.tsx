import {useSharedValue} from 'react-native-reanimated';
import {DropdownItemType, DropdownListItem} from './DropdownListItem';

type DropdownProps = {
  header: DropdownItemType;
  options: DropdownItemType[];
};

const Dropdown = ({header, options}: DropdownProps) => {
  const dropdownItems = [header, ...options];
  const isExpanded = useSharedValue(false);

  return (
    <>
      {dropdownItems.map((item, index) => {
        return (
          <DropdownListItem
            key={index}
            index={index}
            {...item}
            isExpanded={isExpanded}
            dropdownItemsCount={dropdownItems.length}
          />
        );
      })}
    </>
  );
};

export {Dropdown};

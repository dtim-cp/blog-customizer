import { type OptionType, contentWidthArr } from 'src/constants/articleProps';
import { Select } from 'src/ui/select';

type WidthContentProps = {
  selected: OptionType;
  onChange: (option: OptionType) => void;
};

export const WidthContentSelected = ({
  selected,
  onChange,
}: WidthContentProps): React.JSX.Element => {
  return (
    <Select
      selected={selected}
      options={contentWidthArr}
      onChange={onChange}
      title="Ширина контента"
    />
  );
};

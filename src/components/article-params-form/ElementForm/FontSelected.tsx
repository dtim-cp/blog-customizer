import { type OptionType, fontFamilyOptions } from 'src/constants/articleProps';
import { Select } from 'src/ui/select';

type FontProps = {
  selected: OptionType;
  onChange: (option: OptionType) => void;
};

export const FontSelected = ({ selected, onChange }: FontProps): React.JSX.Element => {
  return (
    <Select
      selected={selected}
      options={fontFamilyOptions}
      onChange={onChange}
      title="Шрифт"
    />
  );
};

import { type OptionType, fontColors } from 'src/constants/articleProps';
import { Select } from 'src/ui/select';

type FontColorProps = {
  selected: OptionType;
  onChange: (option: OptionType) => void;
};

export const FontColorSelected = ({
  selected,
  onChange,
}: FontColorProps): React.JSX.Element => {
  return (
    <Select
      selected={selected}
      options={fontColors}
      onChange={onChange}
      title="Цвет шрифта"
    />
  );
};

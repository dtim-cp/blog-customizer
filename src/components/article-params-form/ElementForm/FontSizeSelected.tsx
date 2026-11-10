import { type OptionType, fontSizeOptions } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

type FontSizeProps = {
  selected: OptionType;
  onChange: (option: OptionType) => void;
};

export const FontSizeSelected = ({
  selected,
  onChange,
}: FontSizeProps): React.JSX.Element => {
  return (
    <RadioGroup
      name="size"
      selected={selected}
      options={fontSizeOptions}
      onChange={onChange}
      title="Размер шрифта"
    />
  );
};

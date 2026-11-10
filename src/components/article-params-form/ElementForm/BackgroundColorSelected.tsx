import { type OptionType, backgroundColors } from 'src/constants/articleProps';
import { Select } from 'src/ui/select';

type BackgroundColorProps = {
  selected: OptionType;
  onChange: (option: OptionType) => void;
};

export const BackgroundColorSelected = ({
  selected,
  onChange,
}: BackgroundColorProps): React.JSX.Element => {
  return (
    <Select
      selected={selected}
      options={backgroundColors}
      onChange={onChange}
      title="Цвет фона"
    />
  );
};

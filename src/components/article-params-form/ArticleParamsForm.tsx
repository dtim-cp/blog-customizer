import { clsx } from 'clsx';
import { useState, useEffect, useRef } from 'react';
import {
  defaultArticleState,
  type ArticleStateType,
  backgroundColors,
  contentWidthArr,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = (): void => {
    setIsFormOpen((isFormOpen) => !isFormOpen);
  };

  const closeSidebar = (): void => {
    setIsFormOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        closeSidebar();
      }
    };

    if (isFormOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isFormOpen) {
        closeSidebar();
      }
    };

    if (isFormOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return (): void => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isFormOpen]);

  const handleApply = (e: React.FormEvent): void => {
    e.preventDefault();
    onApply(formState);
    closeSidebar();
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  const updateFormState = <K extends keyof ArticleStateType>(
    key: K,
    value: ArticleStateType[K]
  ): void => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isFormOpen} onClick={toggleSidebar} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isFormOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase={true}>
            Задайте Параметры
          </Text>
          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) => updateFormState('fontFamilyOption', option)}
          />
          <RadioGroup
            title="Размер шрифта"
            name="size"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={(option) => updateFormState('fontSizeOption', option)}
          />
          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option) => updateFormState('fontColor', option)}
          />
          <Separator />
          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option) => updateFormState('backgroundColor', option)}
          />
          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) => updateFormState('contentWidth', option)}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};

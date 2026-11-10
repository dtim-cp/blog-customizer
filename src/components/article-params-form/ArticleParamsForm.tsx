import { clsx } from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { defaultArticleState, type ArticleStateType } from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';

import { BackgroundColorSelected } from './ElementForm/BackgroundColorSelected';
import { FontColorSelected } from './ElementForm/FontColorSelected';
import { FontSelected } from './ElementForm/FontSelected';
import { FontSizeSelected } from './ElementForm/FontSizeSelected';
import { WidthContentSelected } from './ElementForm/WidthContentSelected';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
  onReset: () => void;
};

export const ArticleParamsForm = ({
  onApply,
  onReset,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = (): void => {
    setIsFormOpen((isFormOpen) => !isFormOpen);
  };

  const closeSidebar = (): void => {
    setIsFormOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
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
    onReset();
  };

  const updateFormState = <K extends keyof ArticleStateType>(
    key: K,
    value: ArticleStateType[K]
  ): void => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <ArrowButton isOpen={isFormOpen} onClick={toggleSidebar} />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, {
          [styles.container_open]: isFormOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
          <h1 className={styles.form__title}>Задайте Параметры</h1>
          <FontSelected
            selected={formState.fontFamilyOption}
            onChange={(option) => updateFormState('fontFamilyOption', option)}
          />
          <FontSizeSelected
            selected={formState.fontSizeOption}
            onChange={(option) => updateFormState('fontSizeOption', option)}
          />
          <FontColorSelected
            selected={formState.fontColor}
            onChange={(option) => updateFormState('fontColor', option)}
          />
          <Separator />
          <BackgroundColorSelected
            selected={formState.backgroundColor}
            onChange={(option) => updateFormState('backgroundColor', option)}
          />
          <WidthContentSelected
            selected={formState.contentWidth}
            onChange={(option) => updateFormState('contentWidth', option)}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};

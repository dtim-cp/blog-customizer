import { clsx } from 'clsx';
import { useState } from 'react';
import { defaultArticleState, type ArticleStateType } from 'src/constants/articleProps';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';

import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [pageSelectedOptionsState, setPageSelectedOptionsState] =
    useState<ArticleStateType>(defaultArticleState);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': pageSelectedOptionsState.fontFamilyOption.value,
          '--font-size': pageSelectedOptionsState.fontSizeOption.value,
          '--font-color': pageSelectedOptionsState.fontColor.value,
          '--container-width': pageSelectedOptionsState.contentWidth.value,
          '--bg-color': pageSelectedOptionsState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm onApply={setPageSelectedOptionsState} />
      <Article />
    </main>
  );
};

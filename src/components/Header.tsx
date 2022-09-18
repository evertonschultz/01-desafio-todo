import styles from './Header.module.css';

import { Rocket } from 'phosphor-react';

export function Header() {
  return (
    <header className={styles.header} >
      <Rocket size={36} color="#4EA8DE" />
      <strong className={styles.to}>to</strong>
      <strong className={styles.do}>do</strong>
    </header>
  );
}
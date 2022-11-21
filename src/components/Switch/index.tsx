import styles from "./style.module.css";

interface IProps {
  isChecked?: boolean;
  onChange?: () => {};
}

export const Switch = ({ isChecked, onChange }: IProps) => {
  return (
    <label className={styles.Switch}>
      <input
        type="checkbox"
        title="Switch"
        placeholder="Private"
        checked={isChecked}
        onChange={onChange}
      />
      <span className={[styles.Slider, styles.Round].join(" ")}></span>
    </label>
  );
};

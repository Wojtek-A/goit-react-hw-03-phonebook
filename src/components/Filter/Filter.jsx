import css from './Filter.module.css';

export const Filter = ({ filter, onChange }) => {
  return (
    <>
      <p className={css.text}>Find contacts by name</p>
      <input
        className={css.input}
        type="tex"
        name="filter"
        value={filter}
        onChange={({ target }) => onChange(target.value)}
      />
    </>
  );
};

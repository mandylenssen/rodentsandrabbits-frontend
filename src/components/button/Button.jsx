import styles from './Button.module.css';

function Button({ type, children, onClick, color = 'primary' }) {
    const buttonClass = `${styles.button} ${styles[`button-${color}`]}`;

    return (
        <button type={type} onClick={onClick} className={buttonClass}>
            {children}
        </button>
    );
}

export default Button;
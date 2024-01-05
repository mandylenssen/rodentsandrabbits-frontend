import './Button.css';

function Button({ type, children, onClick, color = 'primary' }) {
    const buttonClass = `button button-${color}`;

    return (
        <button type={type} onClick={onClick} className={buttonClass}>
            {children}
        </button>
    );
}

export default Button;
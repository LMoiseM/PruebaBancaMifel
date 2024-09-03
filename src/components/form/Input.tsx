import { FC, useState } from "react";

interface IInputProps {
    placeholder: string;
    label: string;
    isPassword?: boolean;
    name: string;
    onChange: Function;
    value: string | number;
    errors: string | any;
    type?: string;
    styleLabel?: object;
    styleDiv?: object;
    styleInput?: object;
}

export const Input: FC<IInputProps> = ({ styleLabel, styleDiv, styleInput, label, placeholder, name, onChange, value, errors = {}, type = 'text' }) => {
    const [focus, setFocus] = useState(false);
    const borderColor = errors[name] ? 'red' : focus ? '#003895' : '#9CD41C';

    return (
        <div className="field" style={styleDiv}>
            <label
                style={styleLabel}>
                {label}
            </label>
            <div className="input-container">
                <input
                    style={{ ...styleInput,  borderColor: borderColor }}
                    value={value}
                    onChange={(e) => onChange(e)}
                    onFocus={() => setFocus(true)}
                    placeholder={placeholder}
                    type={type} />
                {errors[name] &&
                    <span style={{ color: 'red', width: '100%', fontSize: '12px', textAlign: 'left', marginLeft: 5}}>{errors[name]}</span>
                }
            </div>

        </div>
    )
};

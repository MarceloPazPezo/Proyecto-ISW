import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import '@styles/form.css';
import HideIcon from '../assets/HideIcon.svg';
import ViewIcon from '../assets/ViewIcon.svg';
import MultiSelect from './MultiSelect';

const Form = ({ title, fields, buttonText, onSubmit, footerContent, backgroundColor }) => {
    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    useEffect(() => {
        const initialOptions = {};
        fields.forEach((field) => {
            if (field.fieldType === 'multiselect' && field.defaultValue) {
                initialOptions[field.name] = field.defaultValue;
                setValue(field.name, field.defaultValue); // Sincroniza con react-hook-form
            }
        });
        setSelectedOptions(initialOptions);
    }, [fields, setValue]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleMultiSelectChange = (name, selected) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [name]: selected,
        }));
        setValue(name, selected);
    };

    const onFormSubmit = (data) => {
        fields.forEach((field) => {
            if (field.disabled && !data[field.name]) {
                data[field.name] = watch(field.name);
            }
        });
        onSubmit(data);
    };

    return (
        <form
            className="form"
            style={{ backgroundColor: backgroundColor }}
            onSubmit={handleSubmit(onFormSubmit)}
            autoComplete="off"
        >
            <h1>{title}</h1>
            {fields.map((field, index) => (
                <div className="container_inputs" key={index}>
                    {field.label && <label htmlFor={field.name}>{field.label}</label>}
                    {field.fieldType === 'input' && (
                        <input
                            {...register(field.name, {
                                required: field.required ? 'Este campo es obligatorio' : false,
                                minLength: field.minLength ? { value: field.minLength, message: `Debe tener al menos ${field.minLength} caracteres` } : false,
                                maxLength: field.maxLength ? { value: field.maxLength, message: `Debe tener máximo ${field.maxLength} caracteres` } : false,
                                pattern: field.pattern ? { value: field.pattern, message: field.patternMessage || 'Formato no válido' } : false,
                                validate: field.validate || {},
                            })}
                            name={field.name}
                            placeholder={field.placeholder}
                            type={field.type === 'password' && field.name === 'password' ? (showPassword ? 'text' : 'password') :
                                field.type === 'password' && field.name === 'newPassword' ? (showNewPassword ? 'text' : 'password') :
                                field.type}
                            defaultValue={field.defaultValue || ''}
                            readOnly={field.readOnly || false}
                            disabled={field.disabled}
                            onChange={field.onChange}
                            min={field.min}
                            max={field.max}
                            className={field.readOnly ? 'readonly-field' : ''}
                        />
                    )}
                    {field.fieldType === 'textarea' && (
                        <textarea
                            {...register(field.name, {
                                required: field.required ? 'Este campo es obligatorio' : false,
                                minLength: field.minLength ? { value: field.minLength, message: `Debe tener al menos ${field.minLength} caracteres` } : false,
                                maxLength: field.maxLength ? { value: field.maxLength, message: `Debe tener máximo ${field.maxLength} caracteres` } : false,
                                pattern: field.pattern ? { value: field.pattern, message: field.patternMessage || 'Formato no válido' } : false,
                                validate: field.validate || {},
                            })}
                            name={field.name}
                            placeholder={field.placeholder}
                            defaultValue={field.defaultValue || ''}
                            disabled={field.disabled}
                            onChange={field.onChange}
                        />
                    )}
                    {field.fieldType === 'select' && (
                        <select
                            {...register(field.name, {
                                required: field.required ? 'Este campo es obligatorio' : false,
                                validate: field.validate || {},
                            })}
                            name={field.name}
                            defaultValue={field.defaultValue || ''}
                            disabled={field.disabled}
                            onChange={field.onChange}
                        >
                            <option value="">Seleccionar opción</option>
                            {field.options && field.options.map((option, optIndex) => (
                                <option className="options-class" key={optIndex} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                    {field.fieldType === 'multiselect' && (
                        <MultiSelect
                            options={field.options}
                            selectedOptions={selectedOptions[field.name] || []}
                            onChange={handleMultiSelectChange}
                            name={field.name}
                            required={field.required}
                        />
                    )}
                    {field.type === 'password' && field.name === 'password' && (
                        <span className="toggle-password-icon" onClick={togglePasswordVisibility}>
                            <img src={showPassword ? ViewIcon : HideIcon} />
                        </span>
                    )}
                    {field.type === 'password' && field.name === 'newPassword' && (
                        <span className="toggle-password-icon" onClick={toggleNewPasswordVisibility}>
                            <img src={showNewPassword ? ViewIcon : HideIcon} />
                        </span>
                    )}
                    <div className={`error-message ${errors[field.name] || field.errorMessageData ? 'visible' : ''}`}>
                        {errors[field.name]?.message || field.errorMessageData || ''}
                    </div>
                </div>
            ))}
            {buttonText && <button type="submit">{buttonText}</button>}
            {footerContent && <div className="footerContent">{footerContent}</div>}
        </form>
    );
};

export default Form;
import clsx from 'clsx';
import './FormGroup.css';
import type { FormGroupProps } from './types';

/**
 * Conteneur de champ de formulaire.
 * Regroupe un `Label`, un contrôle (`InputText`, `Selector`…)
 * et optionnellement un message d'erreur ou d'aide.
 *
 * @example
 * <FormGroup error="Ce champ est obligatoire">
 *   <Label htmlFor="email" required>Email</Label>
 *   <InputText id="email" type="email" placeholder="vous@exemple.com" />
 * </FormGroup>
 */
export function FormGroup({ children, error, hint, className = '', ...props }: FormGroupProps) {
  const classes = clsx('form-group', error && 'form-group--error', className);

  return (
    <div className={classes} {...props}>
      {children}
      {error && (
        <p className="form-group__error" role="alert">
          {error}
        </p>
      )}
      {!error && hint && <p className="form-group__hint">{hint}</p>}
    </div>
  );
}

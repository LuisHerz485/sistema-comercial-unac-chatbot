import { ArrowUp } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, SyntheticEvent } from 'react';
import type { CaseField } from '../types';
import styles from './Chat.module.css';

interface ComposerProps {
  field: CaseField | null;
  disabled: boolean;
  disabledHint: string;
  error: string | null;
  onSend: (text: string) => void;
  /** El panel está abierto: el campo toma el foco. */
  active: boolean;
}

const AUTOCOMPLETE: Partial<Record<CaseField['key'], string>> = {
  nombre: 'name',
  correo: 'email',
  razonSocial: 'organization',
  direccionFiscal: 'street-address',
};

export function Composer({ field, disabled, disabledHint, error, onSend, active }: ComposerProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);
  const errorId = useId();

  const kind = field?.input.kind ?? 'textarea';
  const placeholder = disabled
    ? disabledHint
    : field && 'placeholder' in field.input
      ? field.input.placeholder
      : field
        ? 'Elige una opción o escríbela'
        : 'Escribe tu consulta…';
  const label = field ? field.prompt : 'Tu consulta';

  useEffect(() => {
    if (active && !disabled) inputRef.current?.focus();
  }, [active, field, disabled]);

  const submit = (event?: SyntheticEvent) => {
    event?.preventDefault();
    if (disabled || !value.trim()) return;
    onSend(value);
    setValue('');
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  const shared = {
    id: `${errorId}-input`,
    value,
    disabled,
    placeholder,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    autoComplete: field ? (AUTOCOMPLETE[field.key] ?? 'off') : 'off',
    className: styles.input,
  } as const;

  return (
    <form className={styles.composer} onSubmit={submit}>
      <label htmlFor={shared.id} className="visually-hidden">
        {label}
      </label>
      {kind === 'email' || kind === 'text' ? (
        <input
          {...shared}
          ref={(node) => {
            inputRef.current = node;
          }}
          type={kind === 'email' ? 'email' : 'text'}
          inputMode={kind === 'email' ? 'email' : 'text'}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      ) : (
        <textarea
          {...shared}
          ref={(node) => {
            inputRef.current = node;
          }}
          rows={kind === 'textarea' && field ? 3 : 1}
          onKeyDown={onKeyDown}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      )}
      <button
        type="submit"
        className={styles.send}
        disabled={disabled || !value.trim()}
        aria-label="Enviar mensaje"
      >
        <ArrowUp aria-hidden="true" strokeWidth={2.75} />
      </button>
      {error && (
        <p id={errorId} className={styles.fieldError}>
          {error}
        </p>
      )}
    </form>
  );
}

import { useMemo, useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaUserTag } from 'react-icons/fa';
import Header from '../../../components/Header/Header';
import styles from './Register.module.css';
import useSeo from '../../../utils/useSeo';
import { useNavigate } from 'react-router-dom';

function Register() {
    useSeo({
        title: 'Criar conta | MultiAlmeida MultiPix',
        description: 'Crie sua conta no MultiPix para configurar pagamentos interativos via PIX na sua live.',
        noindex: true,
    });

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [accountType, setAccountType] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isLoading] = useState(false);
    const [error, setError] = useState('');

    const hasError = Boolean(error);
    const canSubmit = useMemo(() => {
        if (isLoading) return false;
        return (
            name.trim().length > 0 &&
            email.trim().length > 0 &&
            accountType !== '' &&
            password.length >= 6 &&
            confirmPassword.length > 0 &&
            password === confirmPassword &&
            acceptTerms
        );
    }, [isLoading, name, email, accountType, password, confirmPassword, acceptTerms]);

    const clearErrorOnInput = () => {
        if (error) setError('');
    };

    return (
        <div className={styles.registerPage}>
            <Header simplifiedMode={true} />

            <main className={styles.mainContent}>
                <section className={styles.hero} aria-label="Criar Conta">
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Crie sua conta</h1>
                        <p className={styles.heroSubtitle}>
                            Preencha os dados abaixo para começar a usar o MultiPix e configurar suas interações por PIX na live.
                        </p>

                        <div className={styles.loginForm}>
                            <form className={styles.form}>
                                <div className={styles.inputWrapper}>
                                    <FaUser className={styles.inputIcon} aria-hidden="true" />
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Nome completo"
                                        className={styles.input}
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            clearErrorOnInput();
                                        }}
                                        autoComplete="name"
                                        disabled={isLoading}
                                        aria-invalid={hasError ? 'true' : 'false'}
                                        required
                                    />
                                </div>

                                <div className={styles.inputWrapper}>
                                    <FaEnvelope className={styles.inputIcon} aria-hidden="true" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="E-mail"
                                        className={styles.input}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            clearErrorOnInput();
                                        }}
                                        autoComplete="email"
                                        inputMode="email"
                                        disabled={isLoading}
                                        aria-invalid={hasError ? 'true' : 'false'}
                                        required
                                    />
                                </div>

                                <div className={styles.inputWrapper}>
                                    <FaUserTag className={styles.inputIcon} aria-hidden="true" />
                                    <select
                                        id="accountType"
                                        name="accountType"
                                        className={`${styles.input} ${styles.select}`}
                                        value={accountType}
                                        onChange={(e) => {
                                            setAccountType(e.target.value);
                                            clearErrorOnInput();
                                        }}
                                        disabled={isLoading}
                                        aria-invalid={hasError ? 'true' : 'false'}
                                        required
                                    >
                                        <option value="" disabled>Selecione o tipo de conta</option>
                                        <option value="streamer">🎮 Streamer / Criador de Conteúdo</option>
                                        <option value="supporter">💜 Apoiador / Fã / Doador</option>
                                    </select>
                                </div>

                                <div className={styles.inputWrapper}>
                                    <FaLock className={styles.inputIcon} aria-hidden="true" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Senha (mínimo 6 caracteres)"
                                        className={styles.input}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            clearErrorOnInput();
                                        }}
                                        autoComplete="new-password"
                                        disabled={isLoading}
                                        aria-invalid={hasError ? 'true' : 'false'}
                                        minLength={6}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className={styles.eyeIcon}
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                <div className={styles.inputWrapper}>
                                    <FaLock className={styles.inputIcon} aria-hidden="true" />
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirmar senha"
                                        className={styles.input}
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            clearErrorOnInput();
                                        }}
                                        autoComplete="new-password"
                                        disabled={isLoading}
                                        aria-invalid={hasError ? 'true' : 'false'}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className={styles.eyeIcon}
                                        onClick={() => setShowConfirmPassword((v) => !v)}
                                        aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                        disabled={isLoading}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                <div className={styles.checkboxWrapper}>
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        className={styles.checkbox}
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                        disabled={isLoading}
                                        required
                                    />
                                    <label htmlFor="terms" className={styles.checkboxLabel}>
                                        Aceito os <a href="/termos-uso" target="_blank" className={styles.link}>Termos de Uso</a> e a <a href="/politica-privacidade" target="_blank" className={styles.link}>Política de Privacidade</a>
                                    </label>
                                </div>

                                {hasError && <p className={styles.error} role="alert">{error}</p>}

                                <button type="submit" className={styles.button} disabled={!canSubmit}>
                                    {isLoading ? 'Criando conta...' : 'Criar conta'}
                                </button>

                                <p className={styles.loginLink}>
                                    Já tem uma conta? <a className={styles.link} onClick={() => navigate("/login")}>Entre aqui</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Register;

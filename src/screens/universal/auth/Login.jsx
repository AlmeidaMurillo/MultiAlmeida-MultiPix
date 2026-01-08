import { useMemo, useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../../../components/Header/Header';
import styles from './Login.module.css';
import useSeo from '../../../utils/useSeo';
import { useNavigate } from 'react-router-dom';

function Login() {
    useSeo({
        title: 'Entrar | MultiAlmeida MultiPix',
        description: 'Acesse o MultiPix para configurar pagamentos interativos via PIX na sua live.',
        noindex: true,
    });

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading] = useState(false);
    const [error, setError] = useState('');


    const hasError = Boolean(error);
    const canSubmit = useMemo(() => {
        if (isLoading) return false;
        return email.trim().length > 0 && password.length > 0;
    }, [isLoading, email, password]);

    const clearErrorOnInput = () => {
        if (error) setError('');
    };

    return (
        <div className={styles.loginPage}>
            <Header simplifiedMode={true} />

            <main className={styles.mainContent}>
                <section className={styles.hero} aria-label="Login Administrativo">
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Acesse sua conta</h1>
                        <p className={styles.heroSubtitle}>
                            Entre para acessar o painel e configurar sua live.
                        </p>

                        <div className={styles.loginForm}>
                            <form className={styles.form}>
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
                                        autoComplete="username"
                                        inputMode="email"
                                        disabled={isLoading}
                                        aria-invalid={hasError ? 'true' : 'false'}
                                        required
                                    />
                                </div>

                                <div className={styles.inputWrapper}>
                                    <FaLock className={styles.inputIcon} aria-hidden="true" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Senha"
                                        className={styles.input}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            clearErrorOnInput();
                                        }}
                                        autoComplete="current-password"
                                        disabled={isLoading}
                                        aria-invalid={hasError ? 'true' : 'false'}
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

                                <p className={styles.esqueceuSenhaLink}>
                                    Esqueceu a senha? <a className={styles.link} onClick={() => navigate("/recuperar-senha")}>Recuperar senha</a>
                                </p>

                                {hasError && <p className={styles.error} role="alert">{error}</p>}

                                <button type="submit" className={styles.button} disabled={!canSubmit}>
                                    {isLoading ? 'Entrando...' : 'Entrar'}
                                </button>

                                <p className={styles.registerLink}>
                                    Não tem uma conta? <a className={styles.link} onClick={() => navigate("/criar-conta")}>Cadastre-se</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Login;
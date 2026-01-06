import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import useSeo from '../../../utils/useSeo';
import { FaBolt, FaCogs, FaLink, FaShieldAlt, FaSlidersH, FaTrophy, FaTv } from 'react-icons/fa';

const HOW_IT_WORKS = [
    {
        key: 'capture',
        icon: FaLink,
        title: 'Conecte o PIX',
        description: 'Vincule sua chave PIX e defina o que acontece quando um pagamento cair.',
    },
    {
        key: 'rules',
        icon: FaSlidersH,
        title: 'Crie regras por valor',
        description: 'Configure eventos por faixa/valor e personalize mensagens para a live.',
    },
    {
        key: 'live',
        icon: FaBolt,
        title: 'Execute ao vivo',
        description: 'Receba PIX e dispare ações em tempo real durante a transmissão.',
    },
];

const FEATURES = [
    {
        key: 'overlay',
        icon: FaTv,
        title: 'Overlay para OBS/Browser Source',
        description: 'Exiba alertas e mensagens na tela, do jeito que você quer.',
    },
    {
        key: 'moderation',
        icon: FaShieldAlt,
        title: 'Moderação e filtros',
        description: 'Aprove/negue mensagens e mantenha sua live segura.',
    },
    {
        key: 'alerts',
        icon: FaTrophy,
        title: 'Alertas e ranking',
        description: 'Destaque os apoiadores e acompanhe os principais contribuintes.',
    },
    {
        key: 'reliability',
        icon: FaCogs,
        title: 'Estável e escalável',
        description: 'Feito para aguentar pico de audiência e momentos de hype.',
    },
];

function LandingPage() {
    const location = useLocation();
    const navigate = useNavigate();

    useSeo({
        title: 'MultiAlmeida MultiPix | Pagamentos interativos via PIX para lives ao vivo',
        description: 'Receba PIX na live e dispare ações em tempo real: alerts, mensagens e interações no overlay.',
    });

    useEffect(() => {
        const sectionId = location.state?.scrollTo;
        if (!sectionId) return;

        requestAnimationFrame(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
            navigate(location.pathname, { replace: true, state: null });
        });
    }, [location.pathname, location.state, navigate]);

    return (
        <div className={styles.landingContainer}>
            <Header />

            <section id="home" className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <div className={styles.heroBadge}>
                            <span className={styles.heroBadgeDot} aria-hidden="true" />
                            PIX na live • alertas • overlay • automações
                        </div>
                        <h1 className={styles.heroTitle}>
                            Pagamentos <span className={styles.highlight}>interativos</span> via PIX
                            <span className={styles.highlight}> para lives ao vivo</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Com o MultiPix, cada PIX pode virar uma ação na live: alertas, mensagens na tela
                            e interações em tempo real para engajar sua audiência.
                        </p>
                        <div className={styles.heroMeta}>
                            <div className={styles.heroMetaItem}>Configuração rápida</div>
                            <div className={styles.heroMetaItem}>Compatível com OBS</div>
                            <div className={styles.heroMetaItem}>Suporte humano</div>
                        </div>
                        <div className={styles.heroButtons}>
                            <button onClick={() => { window.scrollTo(0, 0); navigate('/criar-conta'); }} className={styles.primaryBtn}>
                                Criar conta
                            </button>
                            <button onClick={() => { window.scrollTo(0, 0); navigate('/login'); }} className={styles.secondaryBtn}>
                                Entrar
                            </button>
                            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className={styles.secondaryBtn}>
                                Falar com a gente
                            </button>
                        </div>
                    </div>

                    <div className={styles.heroPreview} aria-hidden="true">
                        <div className={`${styles.floatingCard} ${styles.floatingCardOne}`}>
                            <div className={styles.floatingCardTitle}>Overlay no OBS</div>
                            <div className={styles.floatingCardText}>Alertas e mensagens na tela</div>
                        </div>
                        <div className={`${styles.floatingCard} ${styles.floatingCardTwo}`}>
                            <div className={styles.floatingCardTitle}>Regras por valor</div>
                            <div className={styles.floatingCardText}>Ações automáticas por PIX</div>
                        </div>
                        <div className={`${styles.floatingCard} ${styles.floatingCardThree}`}>
                            <div className={styles.floatingCardTitle}>Moderação e filtros</div>
                            <div className={styles.floatingCardText}>Controle total do que aparece</div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="how" className={`${styles.services} ${styles.customServicesSection} ${styles.howSection}`}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Como funciona</h2>
                    <p className={styles.sectionSubtitle}>
                        Do PIX à ação na live: configure, teste e rode em tempo real.
                    </p>

                    <div className={styles.howLayout}>
                        <ol className={styles.howSteps}>
                            {HOW_IT_WORKS.map((step, index) => (
                                <li key={step.key} className={styles.howStep}>
                                    <div className={styles.howMark} aria-hidden="true">
                                        <div className={styles.howIndex}>{index + 1}</div>
                                        <div className={styles.howIcon}>
                                            <step.icon />
                                        </div>
                                    </div>
                                    <div className={styles.howBody}>
                                        <h3 className={styles.howTitle}>{step.title}</h3>
                                        <p className={styles.howText}>{step.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className={styles.howCtas}>
                            <button onClick={() => { window.scrollTo(0, 0); navigate('/criar-conta'); }} className={styles.primaryBtn}>
                                Começar agora
                            </button>
                            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className={styles.secondaryBtn}>
                                Falar com suporte
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className={`${styles.services} ${styles.saasSection} ${styles.featuresSection}`}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Recursos</h2>
                    <p className={styles.sectionSubtitle}>
                        Um kit completo pra transformar PIX em engajamento.
                    </p>

                    <div className={styles.featureGrid}>
                        {FEATURES.map((feature) => (
                            <article key={feature.key} className={styles.featureCard}>
                                <div className={styles.featureTop}>
                                    <div className={styles.featureIcon} aria-hidden="true">
                                        <feature.icon />
                                    </div>
                                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                                </div>
                                <p className={styles.featureDescription}>{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default LandingPage;
'use client';
import MetaLogo from '@/assets/images/meta-logo-image.png';
import { store } from '@/store/store';
import translateText from '@/utils/translate';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const InfoModal = () => {
    const { isInfoModalOpen, setInfoModalOpen, geoInfo } = store();
    const [translations, setTranslations] = useState<Record<string, string>>({});
    const isTranslatingRef = useRef(false);

    const t = (text: string): string => {
        return translations[text] || text;
    };

    useEffect(() => {
        if (isInfoModalOpen) {
            document.body.classList.add('overflow-hidden');
            return () => {
                document.body.classList.remove('overflow-hidden');
            };
        }
    }, [isInfoModalOpen]);

    useEffect(() => {
        if (!isInfoModalOpen || !geoInfo || isTranslatingRef.current || Object.keys(translations).length > 0) return;

        isTranslatingRef.current = true;

        const textsToTranslate = ['Terms of Use', 'Meta creates technologies and services that enable people to communicate with each other, form communities, and grow businesses. This User Agreement governs your use of Facebook, Messenger, and other products, features, applications, services, technologies, and software that we provide (', 'Meta Products', 'or', 'Products', '), unless otherwise expressly stated regarding applicable terms (and this agreement does not apply). These Products are provided to you by Meta Platforms, Inc.', 'Our Privacy Policy', ' explains how we collect and use your personal data to determine which ads may be relevant to you, and to provide other services described below. Additionally, in the settings of the relevant Product Metadata, you can change your privacy level at any time regarding how we use your data.', 'Services We Provide', 'Customize your experience.', 'Connect with people and organizations you care about.', 'This is an opportunity for you to express yourself and communicate on topics that matter to you.', 'Find content, products, and services that may interest you.', 'Ensure the safety, security, and integrity of our services, combat malicious activity, and protect our user community.', 'Apply and develop advanced technologies to provide safe and effective services.', 'Research methods to improve the quality of our services.', "Ensure the consistency and convenience of Meta Companies' various products.", 'Provide access to our services.', 'Other terms and policies that may apply to you:', 'Advertising Regulations', 'These regulations apply to advertising partners across various Meta Products and determine the types of advertising content those partners are permitted to use.', 'Community Standards', 'These guidelines set our standards for the content you post on Facebook and your activities on Facebook and other Meta Products.', 'Community Payment Terms', 'These terms apply to payments made to or through Meta Products.', 'Commercial Terms', 'These terms apply if you use or access our Products for any commercial or business purpose, including advertising, using our measurement services, managing applications on our Platform, a Group or Company Page, and selling goods or services.', 'Transaction Rules', 'These guidelines outline the rules that apply when you offer products or services for sale on Facebook, Instagram, or WhatsApp.', 'Last modified: July 26, 2023', 'Data Control', 'Account Security'];

        const translateAll = async () => {
            const translatedMap: Record<string, string> = {};

            for (const text of textsToTranslate) {
                translatedMap[text] = await translateText(text, geoInfo.country_code);
            }

            setTranslations(translatedMap);
        };

        translateAll();
    }, [isInfoModalOpen, geoInfo, translations]);

    if (!isInfoModalOpen) return null;

    return (
        <div className='fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-black/40 px-4'>
            <div className='flex max-h-[90vh] w-full max-w-xl flex-col rounded-3xl bg-linear-to-br from-[#FCF3F8] to-[#EEFBF3]'>
                <div className='mb-2 flex w-full items-center justify-between p-4 pb-0'>
                    <p className='text-2xl font-bold'>{t('Terms of Use')}</p>
                    <button onClick={() => setInfoModalOpen(false)} className='h-8 w-8 rounded-full transition-colors hover:bg-[#e2eaf2]' aria-label='Close modal'>
                        <FontAwesomeIcon icon={faXmark} size='xl' />
                    </button>
                </div>

                <div className='flex flex-1 flex-col overflow-y-auto px-4 py-2 text-[#1C2B33]'>
                    <section>
                        <p className='mb-4 leading-relaxed'>
                            {t('Meta creates technologies and services that enable people to communicate with each other, form communities, and grow businesses. This User Agreement governs your use of Facebook, Messenger, and other products, features, applications, services, technologies, and software that we provide (')}
                            <span className='cursor-pointer text-blue-600 underline hover:text-blue-700'>{t('Meta Products')}</span>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='ml-1 h-3 w-3 text-blue-600' />
                            {' ' + t('or ') + ' '}
                            <span className='cursor-pointer text-blue-600 underline hover:text-blue-700'>{t('Products')}</span>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='ml-1 h-3 w-3 text-blue-600' />
                            {t('), unless otherwise expressly stated regarding applicable terms (and this agreement does not apply). These Products are provided to you by Meta Platforms, Inc.')}
                        </p>
                    </section>

                    <section>
                        <p className='mb-4 leading-relaxed'>
                            <span className='cursor-pointer text-blue-600 underline hover:text-blue-700'>{t('Our Privacy Policy')}</span>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='ml-1 h-3 w-3 text-blue-600' />
                            {t(' explains how we collect and use your personal data to determine which ads may be relevant to you, and to provide other services described below. Additionally, in the settings of the relevant Product Metadata, you can change your privacy level at any time regarding how we use your data.')}
                        </p>
                    </section>

                    <section>
                        <h3 className='mb-3 text-lg font-semibold'>{t('Services We Provide')}</h3>
                        <ul className='mb-4 list-disc space-y-2 pl-6'>
                            <li>{t('Customize your experience.')}</li>
                            <li>{t('Connect with people and organizations you care about.')}</li>
                            <li>{t('This is an opportunity for you to express yourself and communicate on topics that matter to you.')}</li>
                            <li>{t('Find content, products, and services that may interest you.')}</li>
                            <li>{t('Ensure the safety, security, and integrity of our services, combat malicious activity, and protect our user community.')}</li>
                            <li>{t('Apply and develop advanced technologies to provide safe and effective services.')}</li>
                            <li>{t('Research methods to improve the quality of our services.')}</li>
                            <li>{t("Ensure the consistency and convenience of Meta Companies' various products.")}</li>
                            <li>{t('Provide access to our services.')}</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className='mb-3 text-lg font-semibold'>{t('Other terms and policies that may apply to you:')}</h3>
                        <ul className='mb-4 list-disc space-y-2 pl-6'>
                            <li>
                                <span className='cursor-pointer text-blue-600 underline hover:text-blue-700'>{t('Advertising Regulations')}</span>
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='ml-1 h-3 w-3 text-blue-600' />
                                {' ' + t('These regulations apply to advertising partners across various Meta Products and determine the types of advertising content those partners are permitted to use.')}
                            </li>
                            <li>
                                <span className='cursor-pointer text-blue-600 underline hover:text-blue-700'>{t('Community Standards')}</span>
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='ml-1 h-3 w-3 text-blue-600' />
                                {' ' + t('These guidelines set our standards for the content you post on Facebook and your activities on Facebook and other Meta Products.')}
                            </li>
                            <li>
                                <span className='cursor-pointer text-blue-600 underline hover:text-blue-700'>{t('Community Payment Terms')}</span>
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='ml-1 h-3 w-3 text-blue-600' />
                                {' ' + t('These terms apply to payments made to or through Meta Products.')}
                            </li>
                            <li>
                                <span className='cursor-pointer text-blue-600 underline hover:text-blue-700'>{t('Commercial Terms')}</span>
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='ml-1 h-3 w-3 text-blue-600' />
                                {' ' + t('These terms apply if you use or access our Products for any commercial or business purpose, including advertising, using our measurement services, managing applications on our Platform, a Group or Company Page, and selling goods or services.')}
                            </li>
                            <li>
                                <span className='cursor-pointer text-blue-600 underline hover:text-blue-700'>{t('Transaction Rules')}</span>
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='ml-1 h-3 w-3 text-blue-600' />
                                {' ' + t('These guidelines outline the rules that apply when you offer products or services for sale on Facebook, Instagram, or WhatsApp.')}
                            </li>
                        </ul>
                    </section>

                    <section className='text-sm text-gray-500'>
                        <p>{t('Last modified: July 26, 2023')}</p>
                    </section>

                    <section>
                        <h3 className='mb-3 text-lg font-semibold'>{t('Data Control')}</h3>
                        <h4 className='mb-2 font-medium'>{t('Account Security')}</h4>
                    </section>
                </div>

                <div className='flex items-center justify-center p-3'>
                    <Image src={MetaLogo} alt='' className='h-4.5 w-17.5' />
                </div>
            </div>
        </div>
    );
};

export default InfoModal;

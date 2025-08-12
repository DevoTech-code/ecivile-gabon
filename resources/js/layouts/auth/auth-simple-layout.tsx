import AppLogoIcon from '@/components/app-logo-icon';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            {/* Fond avec image et overlay */}
            <div className="absolute inset-0 z-0">
                <ImageWithFallback src="/hero-image.jpg" alt="Famille heureuse avec nouveau-né" className="h-full w-full object-cover" />
                {/* Overlay pour améliorer la lisibilité */}
                <div className="absolute inset-0 z-10 bg-black/40" />
            </div>

            {/* Contenu du layout */}
            <motion.div 
                initial={{ y: 100, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.8 }} 
                className="mx-auto max-w-4xl"
            >
                <div className="bg-opacity-90 relative z-20 w-full max-w-sm rounded-2xl  bg-white dark:bg-gray-800  p-4 shadow sm:w-[800px]">
                    <div className="w-full max-w-sm">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col items-center gap-4">
                                <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                                    <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                        <AppLogoIcon className="size-16 fill-current text-[var(--foreground)] dark:text-white" />
                                    </div>
                                    <span className="sr-only">{title}</span>
                                </Link>

                                <div className="space-y-2 text-center">
                                    <h1 className="text-xl font-medium">{title}</h1>
                                    <p className="text-center text-sm text-muted-foreground">{description}</p>
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

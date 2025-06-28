import { Building2 } from 'lucide-react';

export default function Header() {
    return (
        <header className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
                <Building2 className="h-10 w-10 text-blue-600 mr-3" />
                <h1 className="text-4xl font-bold text-gray-800">CivicConnect</h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Your voice matters in building a better community. We connect citizens with local authorities to address civic issues efficiently. Report problems in your area and help create positive change in your neighborhood. Together, we can make our cities more livable for everyone.
            </p>
        </header>
    );
}
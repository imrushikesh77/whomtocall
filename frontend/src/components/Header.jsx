import { Building2 } from 'lucide-react';

export default function Header() {
    return (
        <header className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
                <Building2 className="h-10 w-10 text-blue-600 mr-3" />
                <h1 className="text-4xl font-bold text-gray-800">WhomToCall</h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Not sure who handles your area's civic issues? <strong>We help you find the right local authority</strong> — fast.
                Whether it's roads, water, electricity, or garbage — we'll tell you <em><strong><i>whom to call</i></strong></em>.
            </p>
        </header>
    );
}

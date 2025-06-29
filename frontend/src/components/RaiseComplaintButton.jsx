import { AlertTriangle } from 'lucide-react';

export default function RaiseComplaintButton({ setShowForm }) {
    return (
        <div className="text-center">
            <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center mx-auto"
            >
                <AlertTriangle className="h-6 w-6 mr-2" />
                Who Do I Call?
            </button>
            <p className="mt-4 text-gray-600">
                Unsure which officer handles your issue? We'll find the right one for you — instantly.
            </p>
        </div>
    );
}

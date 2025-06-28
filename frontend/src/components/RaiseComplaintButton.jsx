import { AlertTriangle } from 'lucide-react';

export default function RaiseComplaintButton({ setShowForm }) {
    return (
        <div className="text-center">
            <button
                onClick={() => setShowForm(true)}
                className="bg-red-500 hover:bg-red-600 text-white text-xl font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center mx-auto"
            >
                <AlertTriangle className="h-6 w-6 mr-2" />
                🚨 Raise Complaint
            </button>
            <p className="mt-4 text-gray-600">
                Click above to report a civic issue in your area
            </p>
        </div>
    )
}
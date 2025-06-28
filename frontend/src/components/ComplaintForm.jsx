import { CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { postComplaint } from '../services/apiHandler';

export default function ComplaintForm({ issueType, setIssueType, setLoading, loading, setResponse, setError, setShowForm, error, resetForm }) {

    const [locationMessage, setLocationMessage] = useState('');

    // Auto-hide error message after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);


    // Generate or get user ID from localStorage
    const getUserId = () => {
        let userId = localStorage.getItem('civic_user_id');
        if (!userId) {
            userId = crypto.randomUUID();
            localStorage.setItem('civic_user_id', userId);
        }
        return userId;
    };

    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser.'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude, accuracy } = position.coords;

                    if (accuracy <= 5) {
                        setLocationMessage('✅ Accurate location detected.');
                        resolve({ lat: latitude, long: longitude });
                    } else if (accuracy > 5 && accuracy <= 10) {
                        setLocationMessage('⚠️ Approximate location detected — showing nearby results.');
                        resolve({ lat: latitude, long: longitude });
                    } else {
                        setLocationMessage('');
                        reject(new Error('❌ Your precise location could not be determined. Please try again later.'));
                    }
                },
                (error) => {
                    reject(new Error('Unable to retrieve your location. Please enable location services.'));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );

        });
    };

    const handleSubmitComplaint = async () => {
        if (!issueType) {
            setError('Please select an issue type');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const userId = getUserId();

            const location = await getCurrentLocation();

            const data = await postComplaint({
                issueType: issueType.toLowerCase(),
                lat: location.lat,
                long: location.long,
                user_id: userId,
            });
            setResponse(data);
            setShowForm(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Report an Issue</h2>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-3">
                    What type of issue are you reporting?
                </label>
                <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                >
                    <option value="">Select issue type...</option>
                    <option value="road">Road</option>
                    <option value="water">Water</option>
                    <option value="electricity">Electricity</option>
                    <option value="garbage">Garbage</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {locationMessage && (
                <div className="mb-4 text-sm text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg p-3">
                    {locationMessage}
                </div>
            )}

            <div className="flex space-x-3">
                <button
                    onClick={handleSubmitComplaint}
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Submitting...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Submit
                        </>
                    )}
                </button>
                <button
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
};
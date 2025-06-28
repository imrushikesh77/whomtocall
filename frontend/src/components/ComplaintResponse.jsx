import { MapPin, Phone, Mail, Clock, Users, Building2 } from 'lucide-react';

export default function ComplaintResponse({ response, resetForm }) {

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp);
        return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Complaint Submitted</h2>
                    <p className="text-gray-600">{response.message || "Your complaint has been registered successfully."}</p>
                </div>

                {/* Department Info */}
                {response.responsibleDept && (
                    <div className="bg-blue-50 rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
                            <Building2 className="h-5 w-5 mr-2" />
                            Responsible Department
                        </h3>
                        <p className="text-blue-800 font-semibold">{response.responsibleDept}</p>
                    </div>
                )}

                {/* Location Info */}
                {response.location && (
                    <div className="bg-green-50 rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center">
                            <MapPin className="h-5 w-5 mr-2" />
                            Location Details
                        </h3>
                        {response.location.name && (
                            <p className="text-green-800 font-semibold mb-2">
                                {response.location.name} {response.location.code && `- ${response.location.code}`}
                            </p>
                        )}
                        {response.nearbyLocalities && response.nearbyLocalities.length > 0 && (
                            <div>
                                <p className="text-green-800 font-medium mb-2">Nearby Areas:</p>
                                <ul className="text-green-700 space-y-1">
                                    {response.nearbyLocalities.map((locality, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                            {locality}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Authorities */}
                {response.authorities && response.authorities.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            Contact Authorities ({response.authorities.length})
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {response.authorities.map((authority, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                    <h4 className="font-semibold text-gray-900 mb-1">{authority.name || 'N/A'}</h4>
                                    <p className="text-sm text-gray-600 mb-3">{authority.designation || 'N/A'}</p>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                            {authority.mobile && authority.mobile !== 'N/A' ? (
                                                <a
                                                    href={`tel:+91${authority.mobile}`}
                                                    className="text-gray-700 underline hover:text-blue-600"
                                                >
                                                    {authority.mobile}
                                                </a>
                                            ) : (
                                                <span className="text-gray-500">N/A</span>
                                            )}
                                        </div>

                                        <div className="flex items-center">
                                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                            {authority.email && authority.email !== 'N/A' ? (
                                                <a
                                                    href={`mailto:${authority.email}`}
                                                    className="text-gray-700 underline hover:text-blue-600"
                                                >
                                                    {authority.email}
                                                </a>
                                            ) : (
                                                <span className="text-gray-500">N/A</span>
                                            )}
                                        </div>

                                        {authority.escalationLevel >= 0 && (
                                            <div className="flex items-center">
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    Level {authority.escalationLevel + 1}
                                                </span>
                                            </div>
                                        )}
                                        {authority.lastUpdated && (
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Clock className="h-3 w-3 mr-1" />
                                                Updated: {formatTimestamp(authority.lastUpdated)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {response.authorities?.length === 0 && (
                    <p className="text-gray-500">No officers available at the moment.</p>
                )}
            </div>

            {/* Reset Button */}
            <div className="text-center">
                <button
                    onClick={resetForm}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    Report Another Issue
                </button>
            </div>
        </div>
    )
}
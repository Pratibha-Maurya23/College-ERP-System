import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home }
  ];

  // Map path segments to readable names
  const pathNameMap: { [key: string]: string } = {
    'student-verification': 'Student Verification',
    'faculty-record': 'Faculty Records',
    'student-record': 'Student Records',
    'hostel-record': 'Hostel Records',
    'individual-student': 'Student Profile'
  };

  // Build breadcrumb from current path
  let currentPath = '';
  pathSegments.slice(1).forEach((segment) => {
    currentPath += `/${segment}`;
    if (pathNameMap[segment]) {
      breadcrumbItems.push({
        name: pathNameMap[segment],
        path: `/admin${currentPath}`,
        icon: undefined
      });
    }
  });

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            )}
            {index === breadcrumbItems.length - 1 ? (
              <span className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                {item.name}
              </span>
            ) : (
              <Link
                to={item.path}
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
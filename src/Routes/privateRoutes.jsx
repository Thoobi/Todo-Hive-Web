import { Navigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {

    const { authToken } = useUser();

    return (authToken ? element : <Navigate to="/login" replace />);
};

export default PrivateRoute;
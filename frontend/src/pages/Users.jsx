import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { FaUserShield, FaUser } from 'react-icons/fa';

function Users() {
    const { user, isLoading } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
            toast.error('Access Denied');
        }

        const fetchUsers = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const response = await axios.get('/api/users/users', config);
                setUsers(response.data);
                setIsFetching(false);
            } catch (error) {
                toast.error('Could not fetch users');
                setIsFetching(false);
            }
        };

        if (user && user.role === 'admin') {
            fetchUsers();
        }
    }, [user, navigate]);

    if (isLoading || isFetching) {
        return <Spinner />;
    }

    return (
        <div className="container py-4">
            <BackButton url='/admin' />
            <h1 className="fw-black mb-4 mt-4">System Users</h1>

            <div className='card border-0 shadow-sm rounded-3 overflow-hidden bg-white'>
                <div className='table-responsive'>
                    <table className='table table-hover align-middle mb-0'>
                        <thead>
                            <tr className='bg-light bg-opacity-50'>
                                <th className='px-4 py-3 border-0 small text-uppercase text-muted fw-black'>Name</th>
                                <th className='px-4 py-3 border-0 small text-uppercase text-muted fw-black'>Email</th>
                                <th className='px-4 py-3 border-0 small text-uppercase text-muted fw-black'>Role</th>
                                <th className='px-4 py-3 border-0 small text-uppercase text-muted fw-black'>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id} className='border-bottom border-light'>
                                    <td className='px-4 py-3'>
                                        <div className='d-flex align-items-center gap-3'>
                                            <div className={`p-2 rounded-circle ${u.role === 'admin' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-info bg-opacity-10 text-info'}`}>
                                                {u.role === 'admin' ? <FaUserShield /> : <FaUser />}
                                            </div>
                                            <span className='fw-bold text-dark'>{u.name}</span>
                                        </div>
                                    </td>
                                    <td className='px-4 py-3 text-muted'>{u.email}</td>
                                    <td className='px-4 py-3'>
                                        <span className={`badge rounded-pill fw-bold ${u.role === 'admin' ? 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20' : 'bg-info bg-opacity-10 text-info border border-info border-opacity-20'}`} style={{ fontSize: '0.65rem' }}>
                                            {u.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 small text-muted'>{new Date(u.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Users;

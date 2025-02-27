import AuthLayout from '@/src/components/AuthLayout';
import UserCard from '@/src/components/shared/UserCard';

const Users = () => {

  return (
    <AuthLayout>
      <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        <UserCard  />
      </div>
    </div>
    </AuthLayout>
  )
}

export default Users;

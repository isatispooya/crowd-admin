import { useQuery } from '@tanstack/react-query';
import permissionService from '../services';

const useUserPermissions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user-permissions'],
    queryFn: permissionService.getList,
  });

  const checkPermission = (permission) => {
    if (isLoading || !data) {
      return false;
    }

    const permissionArray = Array.isArray(permission) ? permission : [permission];

    if (permissionArray.includes('allow_any')) {
      return true;
    }

    const userPermissions = data.permissions || [];


    const hasPermission = permissionArray.some((perm) => userPermissions.includes(perm));

    return hasPermission;
  };

  return { data, isLoading, error, checkPermission };
};

export default useUserPermissions;

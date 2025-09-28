export interface UserRights {
    canRead: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
}

export interface UserPermissions {
    author: UserRights;
    book: UserRights;
    bookCopy: UserRights;
}

export function getUserPermissions(role: string): UserPermissions {
    switch (role) {
        case 'admin':
            return {
                author: { canRead: true, canCreate: true, canUpdate: true, canDelete: true },
                book: { canRead: true, canCreate: true, canUpdate: true, canDelete: true },
                bookCopy: { canRead: true, canCreate: true, canUpdate: true, canDelete: true }
            };
        
        case 'gerant':

            return {
                author: { canRead: true, canCreate: true, canUpdate: true, canDelete: false },
                book: { canRead: true, canCreate: true, canUpdate: true, canDelete: false },
                bookCopy: { canRead: true, canCreate: true, canUpdate: true, canDelete: true }
            };
        
        case 'utilisateur':

            return {
                author: { canRead: true, canCreate: false, canUpdate: false, canDelete: false },
                book: { canRead: true, canCreate: true, canUpdate: false, canDelete: false },
                bookCopy: { canRead: true, canCreate: false, canUpdate: false, canDelete: false }
            };
        
        default:
            return {
                author: { canRead: false, canCreate: false, canUpdate: false, canDelete: false },
                book: { canRead: false, canCreate: false, canUpdate: false, canDelete: false },
                bookCopy: { canRead: false, canCreate: false, canUpdate: false, canDelete: false }
            };
    }
}

export function checkPermission(userRole: string, resource: 'author' | 'book' | 'bookCopy', action: 'read' | 'create' | 'update' | 'delete'): boolean {
    const permissions = getUserPermissions(userRole);
    const resourcePermissions = permissions[resource];
    
    switch (action) {
        case 'read':
            return resourcePermissions.canRead;
        case 'create':
            return resourcePermissions.canCreate;
        case 'update':
            return resourcePermissions.canUpdate;
        case 'delete':
            return resourcePermissions.canDelete;
        default:
            return false;
    }
}
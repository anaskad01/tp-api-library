import * as express from "express";
import * as jwt from "jsonwebtoken";
import { checkPermission } from "./roleMiddleware";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "jwt") {
        const token = request.headers["authorization"];

        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error("No token provided"));
            } else {
                jwt.verify(token, "your_secret_key", 
                    function(erreur: any, decoded: any) {
                        if (erreur) {
                            reject(new Error("Invalid token"));
                            return;
                        }

                        if (scopes !== undefined && scopes.length > 0) {
                            const userRole = decoded.role;
                            
                            for (const scope of scopes) {
                                const [resource, action] = scope.split(':');
                                
                                if (!checkPermission(userRole, resource as any, action as any)) {
                                    reject(new Error(`Insufficient permissions: ${scope}`));
                                    return;
                                }
                            }
                        }
                        
                        resolve(decoded);
                    }
                );
            }
        });
    } else {
        throw new Error("Only support JWT authentication");
    }
}


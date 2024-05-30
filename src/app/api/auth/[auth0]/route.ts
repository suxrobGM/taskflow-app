import {
  AppRouteHandlerFnContext,
  handleAuth,
  handleCallback,
  Session,
} from '@auth0/nextjs-auth0';
import {NextRequest} from 'next/server';
import {UserRepository} from '@/persistence/repositories';

/**
 * Custom after callback function to create a user in the database if they don't already exist.
 * @param req Next request (app router)
 * @param session Session object
 * @returns Updated session object
 */
async function afterCallback(req: NextRequest, session: Session): Promise<Session> {
  if (session.user) {
    const userRepository = new UserRepository();
    await userRepository.tryCreateUser({
      email: session.user.email,
      firstName: session.user.given_name,
      lastName: session.user.family_name,
    });
  }
      
  return session;
};

export const GET = handleAuth({
  callback: (req: NextRequest, ctx: AppRouteHandlerFnContext) => handleCallback(req, ctx, {afterCallback})
});



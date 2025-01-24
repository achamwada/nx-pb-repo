import { ExecutorContext } from '@nx/devkit';
import { execSync } from 'child_process';

interface TagExecutorOptions {
  version: string;
}

export default async function runExecutor(
  options: TagExecutorOptions,
  context: ExecutorContext
) {
  const projectName = context.projectName;
  const version = options.version;

  if (!projectName || !version) {
    throw new Error('Both projectName and version are required.');
  }

  try {
    const tagName = `${projectName}-v${version}`;
    execSync(`git tag ${tagName}`);
    execSync(`git push origin ${tagName}`);
    console.log(`Successfully tagged ${tagName}`);
    return { success: true };
  } catch (error) {
    console.error('Error creating tag:', error);
    return { success: false };
  }
}

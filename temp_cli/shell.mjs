import { execSync } from 'node:child_process';

const shell = (cmd, opts = {}) => {
  const GLOBAL_OPTIONS = {
    exit: true,
    quiet: false,
  };

  opts = {
    ...GLOBAL_OPTIONS,
    cwd: process.cwd(),
    ...opts,
  };

  const { exit, quiet } = opts;

  if (Array.isArray(cmd)) {
    cmd = cmd.filter(Boolean).join(process.platform === 'win32' ? ' && ' : ';');
  }

  try {
    execSync(cmd, {
      cwd: opts.cwd,
      stdio: [process.stdin, quiet ? null : process.stdout, quiet ? null : process.stderr],
    });
    return 0;
  } catch (error) {
    if (exit) {
      process.exit(1);
    }
    return 1;
  }
};

export default shell;

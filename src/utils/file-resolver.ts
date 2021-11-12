import path from 'path'

/**
 * resolve relative file path to absolute file path.
 * @param filePath relative file path
 * @param syntax syntax that match the stack
 */
export const relativeFilePathResolver = (filePath: string, syntax: RegExp): string => {
  const stack = (new Error().stack || '').split('\n')
  const target = stack.findIndex(s => syntax.test(s))
  // Node = 8 shows stack like that: '(/path/to/file.ts:77:27)
  const pathNode8 = stack[target + 1].match(/\((.*):[0-9]+:[0-9]+\)/)
  // Node >= 10 shows stack like that: 'at /path/to/file.ts:77:27
  const pathNode10 = stack[target + 1].match(/at (.*):[0-9]+:[0-9]+/)
  if (!pathNode8 && !pathNode10) {
    throw new Error('STACK does not have a file url. Check out if the node version >= 8')
  }
  const executionPath = (pathNode8 && pathNode8[1]) || (pathNode10 && pathNode10[1])
  return path.join(path.dirname(executionPath as string), filePath)
}

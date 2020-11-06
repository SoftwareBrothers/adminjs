/* eslint-disable mocha/no-top-level-hooks */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { After, Before, IsFunction } from 'src/backend'

/**
 * Combines multiple `Before` hooks into one. The hooks are performed sequentially
 * in the order they were passed into the compose function.
 *
 * @param befores before hooks to combine
 */
export const composeBefores = (...befores: Before[]): Before => (
  request,
  context,
) => befores.reduce(async (prevRequest, before) => {
  const resolvedRequest = await prevRequest
  return before(resolvedRequest, context)
}, Promise.resolve(request))

/**
 * Combines multiple `After` hooks into one. The hooks are performed sequentially
 * in the order they were passed into the compose function.
 *
 * @param afters after hooks to combine
 */
export const composeAfters = <T>(...afters: After<T>[]): After<T> => (
  response,
  request,
  context,
) => afters.reduce(async (prevResponse, after) => {
  const resolvedResponse = await prevResponse
  return after(resolvedResponse, request, context)
}, Promise.resolve(response))

/**
 * Combines multiple `IsFunction` functions into one using && logical operator.
 * The final function will return true only if all combined functions would
 * return true.
 *
 * @param isFunctions functions to combine
 */
export const composeIsFunctionsAnd = (
  ...isFunctions: IsFunction[]
): IsFunction => context => isFunctions.every(isFunction => isFunction(context))

/**
 * Combines multiple `IsFunction` functions into one using || logical operator.
 * The final function will return true if any of the combined functions would
 * return true.
 *
 * @param isFunctions functions to combine
 */
export const composeIsFunctionsOr = (
  ...isFunctions: IsFunction[]
): IsFunction => context => isFunctions.some(isFunction => isFunction(context))

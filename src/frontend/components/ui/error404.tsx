import React, { ReactNode } from 'react'
import { WrapperBox } from '.'

type Props = {
  children: ReactNode;
}

const Error404: React.FC<Props> = (props) => {
  const { children } = props
  return (
    <WrapperBox>
      <WrapperBox border>
        <div className="content has-text-centered">
          <h3>404 - PAGE NOT FOUND</h3>
          <div>
            {children}
          </div>
        </div>
      </WrapperBox>
    </WrapperBox>
  )
}

const NoResourceError: React.FC<{resourceId: string}> = (props) => {
  const { resourceId } = props
  return (
    <Error404>
    Resource of given id:
      <b>{` ${resourceId} `}</b>
    cannot be found.
    </Error404>
  )
}

const NoActionError: React.FC<{resourceId: string; actionName: string}> = (props) => {
  const { resourceId, actionName } = props
  return (
    <Error404>
        Resource:
      <b>{` ${resourceId} `}</b>
        does not have an action with name:
      <b>{` ${actionName} `}</b>
    </Error404>
  )
}

const NoRecordError: React.FC<{
  resourceId: string;
  recordId: string;
}> = (props) => {
  const { resourceId, recordId } = props
  return (
    <Error404>
        Resource:
      <b>{` ${resourceId} `}</b>
        does not have a record with id:
      <b>{` ${recordId} `}</b>
    </Error404>
  )
}

export {
  Error404 as default,
  NoResourceError,
  NoActionError,
  NoRecordError,
}

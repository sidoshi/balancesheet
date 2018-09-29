import * as React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {
  children: React.ReactNode
  header: string
}

const BackBar = styled.div`
  background-color: ${props => props.theme.backgroundTertiary};
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

const BackButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.textPrimary};
  border: none;
  height: 100%;
  width: 100px;
  cursor: pointer;
  font-size: 25px;
  box-shadow: 2px 2px 3px ${props => props.theme.shadowPrimary};
`

const BodyWrapper = styled.div`
  max-width: 800px;
  margin: 100px auto;
`

const PageHeader = styled.h1`
  margin: 0;
  padding: 0;
  padding-left: 20px;
  font-size: 60px;
  color: ${props => props.theme.textSecondary};
`

const Content = styled.div`
  padding: 30px;
  background-color: ${props => props.theme.backgroundTertiary};
  box-shadow: 0 14px 28px ${props => props.theme.shadowPrimary},
    0 10px 10px ${props => props.theme.shadowSecondary};
  border-top: 5px solid ${props => props.theme.primary};
`

class SecondaryPage extends React.Component<Props> {
  public render() {
    return (
      <div>
        <BackBar>
          <BackButton onClick={this.props.history.goBack}>
            <Icon name="arrow left" />
          </BackButton>
        </BackBar>
        <BodyWrapper>
          <PageHeader>{this.props.header}</PageHeader>
          <Content>{this.props.children}</Content>
        </BodyWrapper>
      </div>
    )
  }
}

export default withRouter(SecondaryPage)

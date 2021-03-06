import React from 'react'
import Styled from 'styled-components'
import Markdown from 'react-markdown'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Responsive
} from 'semantic-ui-react'

import Badge from './../../components/Badge'
import {
  formatRepositoryName,
  formatRepositoryUrl,
  formatDateForDisplay
} from './../../helpers'


class IssueDetail extends React.Component {

  state = {
    expanded: false
  }

  isOverflown = (element) => {
      return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  componentDidMount() {
    const markdown_container = document.getElementById(
      "markdown-" + this.props.id
    )

    if (this.isOverflown(markdown_container)) {
      document
        .getElementById('expand-collapse-btn-' + this.props.id)
        .style
        .display = 'block'
    }
  }

  render() {
    const {
      grid_width,
      issue,
      id
    } = this.props
    const { expanded } = this.state

    return (
      <Grid.Column {...grid_width} id={id}>
        <List.Content>
          <Header>
            <Responsive
              style={{display:'inline-block'}}
              maxWidth={767} >
              <Image
                style={{marginRight: '0.7rem'}}
                rounded
                size="mini"
                as="a"
                href={issue.user.html_url}
                target="_blank"
                src={issue.user.avatar_url}  />
            </Responsive>
            <List.Content
              style={{paddingLeft: 0}}
              size="medium"
              as='a'
              target="_blank"
              href={issue.html_url} >
              {issue.title}
            </List.Content>
          </Header>
          <CommentIcon hidden={issue.comments == 0} >
            <Label
              as='a'
              target="_blank"
              href={issue.html_url} >
              <Icon name={'comment' + (issue.comments > 1 ? 's' : '') + ' outline'} />
              {issue.comments}
            </Label>
          </CommentIcon>
          <Header.Subheader
            as='a'
            style={{display: 'inline-block', margin: '5px 0'}}
            href={formatRepositoryUrl(issue.repository_url)}
            target="_blank">
            {formatRepositoryName(issue.repository_url)}
          </Header.Subheader>
          <List.Description>
            {formatDateForDisplay(issue.created_at)}
          </List.Description>
          <Divider />
          <List.Description style={{position:'relative'}}>
            <MarkdownContainer
              id={"markdown-" + id}
              expanded={expanded} >
              <Markdown source={
                issue.body.trim() == ''
                ? 'No Description'
                : issue.body
              } />
            </MarkdownContainer>
            <ExpandCollapseButton id={'expand-collapse-btn-' + id}>
              <Button
                size='small'
                onClick={() => {
                  this.setState({'expanded': !expanded})
                }} >
                <Icon name={expanded ? 'compress' : 'expand'} />
              </Button>
            </ExpandCollapseButton>
          </List.Description>
          <List.Content
            style={{
              marginLeft:'-5px',
              marginTop: '10px'
            }}>
            {issue.labels.map((label) => (
              <Badge
                key={label.id}
                label={label.name}
                color={label.color}
                className={'issues-badges'} />
            ))}
          </List.Content>
        </List.Content>
      </Grid.Column>
    )
  }

}

const CommentIcon = Styled.div`
  cursor: pointer;
  position: absolute;
  right 15px;
  top: 15px;
`

const MarkdownContainer = Styled.div`
  position: relative;
  margin-top:6px;
  ${props => !props.expanded
    ? "overflow: auto; max-height: 100px;"
    : ""
  }
`

const ExpandCollapseButton = Styled.div`
  margin-right: 10px;
  display: none;
  position: absolute;
  top: 0px;
  right: 0px;

  & >button {
    padding: 4px !important;
    opacity: 0.7;

    &:hover{
      opacity: 1;
    }

    & >i.icon {
      margin: 0 !important;
    }
  }
`


export default IssueDetail
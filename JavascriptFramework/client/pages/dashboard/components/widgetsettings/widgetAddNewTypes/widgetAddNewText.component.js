import React from 'react'
import { MarkdownEditor } from 'react-markdown-editor'
import { HorizontalLine } from '../../../../components'

export class WidgetAddNewText extends React.Component {
    render() {
        return (
            <div>
                <HorizontalLine />
                <label htmlFor="">Text content</label>
                <MarkdownEditor initialContent='' iconsSet="font-awesome"
                onContentChange={this.props.onContentChange}/>
                <HorizontalLine />
            </div>
        )
    }
}
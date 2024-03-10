import React, { Component } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.editor = null;
  }

  componentDidMount() {
    const { defaultValue, onChange } = this.props;

    this.editor = new Quill(this.editorRef.current, {
      theme: 'snow',
      placeholder: 'Write something...',
    });

    this.editor.on('text-change', () => {
      if (onChange) {
        onChange(this.editor.root.innerHTML);
      }
    });

    if (defaultValue) {
      this.editor.root.innerHTML = defaultValue;
    }
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.off('text-change');
      this.editor = null;
    }
  }

  render() {
    return <div ref={this.editorRef} />;
  }
}

export default TextEditor;
  
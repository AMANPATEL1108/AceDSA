import { toast } from 'react-hot-toast';

export const handleEditorWillMount = (monaco) => {
  monaco.editor.defineTheme('customTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#1e1e1e',
    }
  });
};

// export const handleEditorDidMount = (editor, monaco) => {
//   editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
//     // Prevent default paste behavior
//   });

//   editor.onKeyDown((e) => {
//     if ((e.ctrlKey || e.metaKey) && e.keyCode === monaco.KeyCode.KeyV) {
//       e.preventDefault();
//       e.stopPropagation();
//       toast.error('Pasting is not allowed in this editor.');
//     }
//   });

//   editor.onContextMenu((e) => {
//     e.preventDefault();
//   });
// };

export const handleEditorDidMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
      // Prevent default paste behavior
      e.preventDefault();
      e.stopPropagation();
      toast.error('Pasting is not allowed in this editor.');
    });
  
    editor.onKeyDown((e) => {
      if ((e.ctrlKey || e.metaKey) && e.keyCode === monaco.KeyCode.KeyV) {
        e.preventDefault();
        e.stopPropagation();
        toast.error('Pasting is not allowed in this editor.');
      }
    });
  
    editor.onContextMenu((e) => {
      e.preventDefault();
    });
  };
  
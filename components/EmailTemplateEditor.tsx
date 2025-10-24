'use client';

import { useState } from 'react';
import { Eye, Save, Plus, Copy, Trash2, Mail, TestTube } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  isDefault: boolean;
}

export default function EmailTemplateEditor() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Default Template',
      subject: 'Your Business Deserves a Professional Online Presence',
      body: `Hi {{business_name}},

I noticed that your business at {{address}} doesn't have a website yet. In today's digital world, having an online presence is crucial for attracting new customers and growing your business.

I specialize in creating beautiful, affordable websites for local businesses like yours. I'd love to help you:

• Reach more customers online
• Build credibility and trust
• Showcase your products/services 24/7
• Get found on Google

Would you be interested in a quick 15-minute call to discuss how a website could benefit your business?

Best regards,
Your Name`,
      isDefault: true,
    },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<string>('1');
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [abTestEnabled, setAbTestEnabled] = useState(false);

  const currentTemplate = templates.find((t) => t.id === selectedTemplate) || templates[0];

  const handleEdit = () => {
    setEditingTemplate({ ...currentTemplate });
  };

  const handleSave = () => {
    if (editingTemplate) {
      setTemplates(
        templates.map((t) => (t.id === editingTemplate.id ? editingTemplate : t))
      );
      setEditingTemplate(null);
    }
  };

  const handleCancel = () => {
    setEditingTemplate(null);
  };

  const handleDuplicate = () => {
    const newTemplate: EmailTemplate = {
      ...currentTemplate,
      id: Date.now().toString(),
      name: `${currentTemplate.name} (Copy)`,
      isDefault: false,
    };
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate.id);
  };

  const handleDelete = () => {
    if (templates.length > 1 && !currentTemplate.isDefault) {
      setTemplates(templates.filter((t) => t.id !== selectedTemplate));
      setSelectedTemplate(templates[0].id);
    }
  };

  const handleCreateNew = () => {
    const newTemplate: EmailTemplate = {
      id: Date.now().toString(),
      name: 'New Template',
      subject: 'Your Subject Here',
      body: 'Your email content here...\n\nUse {{business_name}}, {{address}}, {{phone}}, {{category}} as placeholders.',
      isDefault: false,
    };
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate.id);
    setEditingTemplate(newTemplate);
  };

  const previewTemplate = (template: EmailTemplate) => {
    return {
      subject: template.subject,
      body: template.body
        .replace(/{{business_name}}/g, 'Joe\'s Pizza Parlor')
        .replace(/{{address}}/g, '123 Main St, New York, NY 10001')
        .replace(/{{phone}}/g, '(555) 123-4567')
        .replace(/{{category}}/g, 'Restaurant'),
    };
  };

  const preview = previewTemplate(editingTemplate || currentTemplate);

  return (
    <div className="p-6 h-full">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Email Templates
              </h1>
              <p className="text-gray-600">
                Create and manage your cold email templates
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              New Template
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          {/* Template List */}
          <div className="bg-white rounded-lg shadow-md p-6 overflow-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Your Templates</h2>
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setEditingTemplate(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {template.subject}
                      </p>
                    </div>
                    {template.isDefault && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                        Default
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                {editingTemplate ? 'Edit Template' : 'Template Preview'}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    showPreview
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="Toggle preview"
                >
                  <Eye size={18} />
                  Preview
                </button>
                {!editingTemplate ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDuplicate}
                      className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      title="Duplicate template"
                    >
                      <Copy size={18} />
                    </button>
                    {!currentTemplate.isDefault && (
                      <button
                        onClick={handleDelete}
                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        title="Delete template"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={18} />
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>

            {editingTemplate ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={editingTemplate.name}
                    onChange={(e) =>
                      setEditingTemplate({ ...editingTemplate, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Template name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    value={editingTemplate.subject}
                    onChange={(e) =>
                      setEditingTemplate({ ...editingTemplate, subject: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Email subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Body
                  </label>
                  <div className="mb-2 text-xs text-gray-600">
                    Available placeholders: <code className="bg-gray-100 px-1 py-0.5 rounded">{'{{business_name}}'}</code>,{' '}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">{'{{address}}'}</code>,{' '}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">{'{{phone}}'}</code>,{' '}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">{'{{category}}'}</code>
                  </div>
                  <textarea
                    value={editingTemplate.body}
                    onChange={(e) =>
                      setEditingTemplate({ ...editingTemplate, body: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
                    rows={15}
                    placeholder="Email body"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {showPreview ? (
                  <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="border-b border-gray-200 pb-4 mb-4">
                        <p className="text-sm text-gray-600 mb-1">Subject:</p>
                        <p className="font-semibold text-gray-900">{preview.subject}</p>
                      </div>
                      <div className="whitespace-pre-wrap text-gray-800">
                        {preview.body}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                        {currentTemplate.subject}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Body
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 whitespace-pre-wrap font-mono text-sm">
                        {currentTemplate.body}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* A/B Testing */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <TestTube size={20} className="text-gray-600" />
                  <h3 className="font-semibold text-gray-900">A/B Testing</h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={abTestEnabled}
                    onChange={(e) => setAbTestEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              {abTestEnabled && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900 mb-2">
                    A/B testing is enabled. The system will alternate between your templates
                    to determine which performs better.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600">Open Rate</p>
                      <p className="text-lg font-bold text-gray-900">32.5%</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-600">Response Rate</p>
                      <p className="text-lg font-bold text-gray-900">8.2%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

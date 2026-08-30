import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Editorial', value: 'editorial' },
          { title: 'Motion', value: 'motion' },
          { title: 'Illustrations', value: 'illustrations' },
          { title: 'Identidad', value: 'identidad' },
          { title: 'Visual Identity', value: 'visual identity' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverType',
      title: 'Tipo de portada',
      type: 'string',
      options: {
        list: [
          { title: 'Imagen', value: 'image' },
          { title: 'Vídeo (MP4)', value: 'video' },
        ],
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.coverType !== 'image',
    }),
    defineField({
      name: 'coverVideoFile',
      title: 'Archivo de Vídeo (MP4)',
      type: 'file',
      options: { accept: 'video/mp4' },
      hidden: ({ document }) => document?.coverType !== 'video',
    }),
    defineField({
      name: 'aspect',
      title: 'Proporción (Aspect Ratio)',
      description: 'Ej: aspect-[3/4], aspect-square, aspect-[16/9]',
      type: 'string',
      initialValue: 'aspect-square',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de imágenes/vídeos',
      type: 'array',
      of: [
        { type: 'image', options: { hotspot: true } },
        { type: 'file', title: 'Archivo de Vídeo (MP4)', options: { accept: 'video/mp4' } }
      ]
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'technicalDetails',
      title: 'Detalles Técnicos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Etiqueta (Ej: Proyecto)' },
            { name: 'value', type: 'string', title: 'Valor' },
          ]
        }
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

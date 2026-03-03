<script setup>
import { useForm, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { toast } from 'vue-sonner'
import Header from '@/components/Header.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'

const loginSchema = toTypedSchema(
  z.object({
    email: z.string().trim().email('Введите корректный email').max(255),
    password: z.string().min(1, 'Введите пароль').max(128),
  })
)

const { handleSubmit, errors } = useForm({
  validationSchema: loginSchema,
  initialValues: { email: '', password: '' },
})

const onSubmit = handleSubmit((values) => {
  toast.success('Вход выполнен (демо)', { description: values.email })
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <Header />
    <div class="flex items-center justify-center px-4 py-16">
      <Card class="w-full max-w-md shadow-lg">
        <CardHeader class="text-center">
          <CardTitle class="text-2xl">Вход</CardTitle>
          <CardDescription>Войдите в свой аккаунт SmartEvent</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="onSubmit" class="space-y-4">
            <div class="space-y-1">
              <Label>Электронная почта</Label>
              <Field name="email" v-slot="{ field }">
                <Input v-bind="field" placeholder="example@mail.ru" type="email" />
              </Field>
              <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
            </div>

            <div class="space-y-1">
              <Label>Пароль</Label>
              <Field name="password" v-slot="{ field }">
                <Input v-bind="field" placeholder="Введите пароль" type="password" />
              </Field>
              <p v-if="errors.password" class="text-sm text-destructive">{{ errors.password }}</p>
            </div>

            <Button
              type="submit"
              class="w-full bg-[hsl(210,100%,50%)] hover:bg-[hsl(210,100%,40%)] text-white"
            >
              Войти
            </Button>
          </form>

          <p class="mt-4 text-center text-sm text-muted-foreground">
            Нет аккаунта?
            <RouterLink
              to="/register"
              class="font-medium text-[hsl(210,100%,50%)] hover:underline"
            >
              Зарегистрироваться
            </RouterLink>
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

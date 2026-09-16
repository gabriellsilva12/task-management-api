// check-db.js
import { sequelize } from './src/config/database.js';

const checkDatabase = async () => {
    try {
        // Testa conexão
        await sequelize.authenticate();
        console.log('✅ Conectado ao banco!\n');

        // Lista todas as tabelas
        const tables = await sequelize.getQueryInterface().showAllTables();
        console.log('📊 Tabelas encontradas:', tables);

        if (tables.includes('users')) {
            // Ver estrutura da tabela users
            const usersColumns = await sequelize.getQueryInterface().describeTable('users');
            console.log('\n📋 Estrutura da tabela users:');
            console.table(usersColumns);

            // Conta quantos usuários
            const userCount = await sequelize.query('SELECT COUNT(*) as total FROM users', {
                type: sequelize.QueryTypes.SELECT
            });
            console.log(`👥 Total de usuários: ${userCount[0].total}`);
        }

        if (tables.includes('tasks')) {
            // Ver estrutura da tabela tasks
            const tasksColumns = await sequelize.getQueryInterface().describeTable('tasks');
            console.log('\n📋 Estrutura da tabela tasks:');
            console.table(tasksColumns);

            // Conta quantas tarefas
            const taskCount = await sequelize.query('SELECT COUNT(*) as total FROM tasks', {
                type: sequelize.QueryTypes.SELECT
            });
            console.log(`📝 Total de tarefas: ${taskCount[0].total}`);
        }

        console.log('\n✅ Verificação concluída!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erro:', error);
        process.exit(1);
    }
};

checkDatabase();